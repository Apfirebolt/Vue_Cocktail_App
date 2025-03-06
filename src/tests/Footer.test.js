/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../components/FooterComponent.vue';

describe('Footer', () => {
  it('renders a footer', () => {
    const wrapper = mount(Footer);
    expect(wrapper.find('footer').exists()).toBe(true);
  });

  it('renders the correct year', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${currentYear} Cocktails DP Built with Vue 3, Typescript and Tailwind CSS`);
  });

  it('has the correct classes applied', () => {
    const wrapper = mount(Footer);
    const footer = wrapper.find('footer');
    expect(footer.classes()).toContain('py-4');
    expect(footer.classes()).toContain('bg-primary-200');
    expect(footer.classes()).toContain('text-secondary-300');
    expect(footer.classes()).toContain('dark:bg-slate-700');
    expect(footer.classes()).toContain('dark:text-white');
  });

  it('renders the container div with correct classes', () => {
    const wrapper = mount(Footer);
    const container = wrapper.find('div.container');
    expect(container.classes()).toContain('mx-auto');
    expect(container.classes()).toContain('px-4');
  });

  it('renders the paragraph with correct classes', () => {
    const wrapper = mount(Footer);
    const paragraph = wrapper.find('p');
    expect(paragraph.classes()).toContain('text-center');
    expect(paragraph.classes()).toContain('text-sm');
  });
});