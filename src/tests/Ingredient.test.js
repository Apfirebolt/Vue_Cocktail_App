import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Ingredient from '../views/Ingredient.vue';
import httpClient from '../plugins/interceptor';

vi.mock('../plugins/interceptor', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Ingredient view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders ingredients', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strIngredient1: 'Vodka' },
          { strIngredient1: 'Rum' },
        ],
      },
    });

    const wrapper = mount(Ingredient, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith('1/list.php?i=list');
    expect(wrapper.text()).toContain('Vodka');
    expect(wrapper.text()).toContain('Rum');
  });

  it('filters ingredients with search text', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strIngredient1: 'Vodka' },
          { strIngredient1: 'Rum' },
        ],
      },
    });

    const wrapper = mount(Ingredient, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();
    await wrapper.find('input').setValue('vod');

    expect(wrapper.text()).toContain('Vodka');
    expect(wrapper.text()).not.toContain('Rum');
  });

  it('shows empty state when request fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    httpClient.get.mockRejectedValueOnce(new Error('network error'));

    const wrapper = mount(Ingredient, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(errorSpy).toHaveBeenCalled();
    expect(wrapper.text()).toContain('No ingredients match');
  });
});
