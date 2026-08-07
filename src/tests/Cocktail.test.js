import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Cocktail from '../views/Cocktail.vue';
import httpClient from '../plugins/interceptor';

vi.mock('../plugins/interceptor', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Cocktail view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads margarita cocktails on mount', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          {
            idDrink: '11007',
            strDrink: 'Margarita',
            strDrinkThumb: 'https://img.test/margarita.jpg',
            strInstructions: 'Shake with ice',
          },
        ],
      },
    });

    const wrapper = mount(Cocktail, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith('1/search.php?s=margarita');
    expect(wrapper.text()).toContain('Margarita');
  });

  it('searches using trimmed input value', async () => {
    httpClient.get
      .mockResolvedValueOnce({ data: { drinks: [] } })
      .mockResolvedValueOnce({
        data: {
          drinks: [
            {
              idDrink: '17222',
              strDrink: 'A1',
              strDrinkThumb: 'https://img.test/a1.jpg',
              strInstructions: 'Mix ingredients',
            },
          ],
        },
      });

    const wrapper = mount(Cocktail, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    const input = wrapper.find('input');
    await input.setValue('   a1   ');
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(httpClient.get).toHaveBeenLastCalledWith('1/search.php?s=a1');
    expect(wrapper.text()).toContain('A1');
  });

  it('shows empty state when API fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    httpClient.get.mockRejectedValueOnce(new Error('network error'));

    const wrapper = mount(Cocktail, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(errorSpy).toHaveBeenCalled();
    expect(wrapper.text()).toContain('No cocktails found');
  });
});
