import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Home from '../views/Home.vue';
import httpClient from '../plugins/interceptor';

vi.mock('../plugins/interceptor', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Home view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders a random cocktail on mount', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          {
            idDrink: '11007',
            strDrink: 'Margarita',
            strDrinkThumb: 'https://img.test/margarita.jpg',
            strInstructions: 'Shake and serve.',
            strCategory: 'Ordinary Drink',
            strGlass: 'Cocktail glass',
            strAlcoholic: 'Alcoholic',
          },
        ],
      },
    });

    const wrapper = mount(Home, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith('1/random.php');
    expect(wrapper.text()).toContain('Margarita');
    expect(wrapper.text()).toContain('Shake and serve.');
  });

  it('handles API error gracefully', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    httpClient.get.mockRejectedValueOnce(new Error('network error'));

    const wrapper = mount(Home, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(errorSpy).toHaveBeenCalled();
    expect(wrapper.text()).toContain('Cocktail of the Moment');
  });

  it('fetches another cocktail when clicking the refresh button', async () => {
    httpClient.get
      .mockResolvedValueOnce({
        data: {
          drinks: [
            {
              idDrink: '1',
              strDrink: 'First',
              strDrinkThumb: 'https://img.test/1.jpg',
              strInstructions: 'First instructions',
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          drinks: [
            {
              idDrink: '2',
              strDrink: 'Second',
              strDrinkThumb: 'https://img.test/2.jpg',
              strInstructions: 'Second instructions',
            },
          ],
        },
      });

    const wrapper = mount(Home, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();
    await wrapper.find('button').trigger('click');
    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledTimes(2);
    expect(wrapper.text()).toContain('Second');
  });
});
