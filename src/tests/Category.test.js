import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import Category from '../views/Category.vue';
import httpClient from '../plugins/interceptor';

vi.mock('../plugins/interceptor', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('Category view', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders categories', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strCategory: 'Ordinary Drink' },
          { strCategory: 'Cocktail' },
        ],
      },
    });

    const wrapper = mount(Category, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(httpClient.get).toHaveBeenCalledWith('1/list.php?c=list');
    expect(wrapper.text()).toContain('Ordinary Drink');
    expect(wrapper.text()).toContain('Cocktail');
  });

  it('filters categories by search query', async () => {
    httpClient.get.mockResolvedValueOnce({
      data: {
        drinks: [
          { strCategory: 'Ordinary Drink' },
          { strCategory: 'Cocktail' },
        ],
      },
    });

    const wrapper = mount(Category, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();
    await wrapper.find('input').setValue('ordinary');

    expect(wrapper.text()).toContain('Ordinary Drink');

    const categoryCards = wrapper
      .findAll('h2.text-lg')
      .map((node) => node.text());

    expect(categoryCards).toContain('Ordinary Drink');
    expect(categoryCards).not.toContain('Cocktail');
  });

  it('shows empty state when request fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    httpClient.get.mockRejectedValueOnce(new Error('network error'));

    const wrapper = mount(Category, {
      global: {
        stubs: { Loader: true },
      },
    });

    await flushPromises();

    expect(errorSpy).toHaveBeenCalled();
    expect(wrapper.text()).toContain('No categories found');
  });
});
