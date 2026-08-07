import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../components/FooterComponent.vue';

describe('Footer', () => {
  it('renders the footer shell', () => {
    const wrapper = mount(Footer);
    expect(wrapper.find('footer').exists()).toBe(true);
  });

  it('renders the current year and brand text', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${currentYear}`);
    expect(wrapper.text()).toContain('Cocktails DP');
  });

  it('shows the technology badges', () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain('Vue 3');
    expect(wrapper.text()).toContain('TypeScript');
    expect(wrapper.text()).toContain('Tailwind CSS');
  });
});