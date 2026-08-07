import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Glass from '../views/Glass.vue';
import httpClient from '../plugins/interceptor';

vi.mock('../plugins/interceptor', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Glass view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders glasses', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strGlass: 'Highball glass' },
          { strGlass: 'Cocktail glass' },
        ],
      },
    });

    const wrapper = mount(Glass, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith('1/list.php?g=list');
    expect(wrapper.text()).toContain('Highball glass');
    expect(wrapper.text()).toContain('Cocktail glass');
  });

  it('filters glasses with search text', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strGlass: 'Highball glass' },
          { strGlass: 'Cocktail glass' },
        ],
      },
    });

    const wrapper = mount(Glass, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();
    await wrapper.find('input').setValue('highball');

    expect(wrapper.text()).toContain('Highball glass');
    expect(wrapper.text()).not.toContain('Cocktail glass');
  });

  it('shows empty state when request fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    httpClient.get.mockRejectedValueOnce(new Error('network error'));

    const wrapper = mount(Glass, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(errorSpy).toHaveBeenCalled();
    expect(wrapper.text()).toContain('No glass types found');
  });
});
