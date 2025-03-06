/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../components/HeaderComponent.vue';

describe('Header', () => {
    it('renders a header', () => {
        const wrapper = mount(Header);
        expect(wrapper.find('nav').exists()).toBe(true);
    });

    it('renders the correct title', () => {
        const wrapper = mount(Header);
        expect(wrapper.text()).toContain('Vue Cocktails');
    });

    it('renders the correct number of links', () => {
        const wrapper = mount(Header);
        const links = wrapper.findAll('router-link');
        expect(links.length).toBe(6);
    });

    it('renders the dark mode button', () => {
        const wrapper = mount(Header);
        const button = wrapper.find('button');
        expect(button.exists()).toBe(true);
    });
});
