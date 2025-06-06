import { ref, onMounted, watchEffect } from 'vue';

export default function useDark() {
  const key = 'prefers-dark';
  const isDark = ref(
    JSON.parse(localStorage.getItem(key)) ?? window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const apply = () => {
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  onMounted(apply);

  watchEffect(() => {
    localStorage.setItem(key, isDark.value);
    apply();
  });

  const toggle = () => {
    isDark.value = !isDark.value;
  };

  return { isDark, toggle };
}
