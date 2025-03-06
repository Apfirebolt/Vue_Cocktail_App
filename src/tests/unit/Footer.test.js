import { mount } from '@vue/test-utils';
import Footer from '../../components/FooterComponent.vue'; // Adjust the path

describe('Footer', () => {
  it('renders the current year in the copyright message', () => {
    const wrapper = mount(Footer);
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(`© ${currentYear} Cocktails DP`);
  });

  it('applies the correct classes', () => {
    const wrapper = mount(Footer);
    const footer = wrapper.find('footer');

    expect(footer.classes()).toContain('py-4');
    expect(footer.classes()).toContain('bg-primary-200');
    expect(footer.classes()).toContain('text-secondary-300');
    expect(footer.classes()).toContain('dark:bg-slate-700');
    expect(footer.classes()).toContain('dark:text-white');
  });

  it('renders the container and paragraph correctly', () => {
    const wrapper = mount(Footer);
    const container = wrapper.find('.container');
    const paragraph = wrapper.find('p');

    expect(container.exists()).toBe(true);
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.classes()).toContain('text-center');
    expect(paragraph.classes()).toContain('text-sm');
  });

  it('contains the expected text', () => {
    const wrapper = mount(Footer);
    expect(wrapper.text()).toContain('Cocktails DP Built with Vue 3, Typescript and Tailwind CSS');
  });
});