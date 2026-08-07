import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from '../components/HeaderComponent.vue';

describe('Header', () => {
    beforeEach(() => {
        const storage = {};
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key) => (key in storage ? storage[key] : null)),
            setItem: vi.fn((key, value) => {
                storage[key] = String(value);
            }),
            removeItem: vi.fn((key) => {
                delete storage[key];
            }),
            clear: vi.fn(() => {
                Object.keys(storage).forEach((key) => delete storage[key]);
            }),
        });

        document.documentElement.classList.remove('dark');
        vi.spyOn(window, 'matchMedia').mockImplementation(() => ({
            matches: false,
            media: '',
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
    });

    it('renders nav and title', () => {
        const wrapper = mount(Header);
        expect(wrapper.find('nav').exists()).toBe(true);
        expect(wrapper.text()).toContain('Vue Cocktails');
    });

    it('renders all navigation links', () => {
        const wrapper = mount(Header);

        expect(wrapper.text()).toContain('Home');
        expect(wrapper.text()).toContain('About');
        expect(wrapper.text()).toContain('Cocktails');
        expect(wrapper.text()).toContain('Ingredients');
        expect(wrapper.text()).toContain('Categories');
        expect(wrapper.text()).toContain('Glasses');
    });

    it('toggles dark mode and persists in localStorage', async () => {
        const wrapper = mount(Header);
        const button = wrapper.find('button[aria-label="Toggle dark mode"]');

        await button.trigger('click');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(globalThis.localStorage.getItem('darkMode')).toBe('true');

        await button.trigger('click');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(globalThis.localStorage.getItem('darkMode')).toBe('false');
    });

    it('uses saved dark mode value on mount', () => {
        globalThis.localStorage.setItem('darkMode', 'true');

        mount(Header);

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
