<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isSticky = ref(false);

const handleScroll = () => {
  isSticky.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div 
    id="navbar" 
    class="max-w-2xl px-4 py-2 mx-auto rounded-xl" 
    :class="{ 'shadow-lg bg-neutral-200 backdrop-blur-lg bg-opacity-30 sticky': isSticky }"
  >
    <nav class="">
      <ul class="flex space-x-4">
        <NuxtLink to="/">home</NuxtLink>
        <NuxtLink to="/berleti">berleti</NuxtLink>
        <NuxtLink to="/test">test</NuxtLink>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
#navbar {
  width: 100%;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

#navbar.sticky {
  opacity: 1;
  width: 80%;
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s forwards;
}

#navbar.stretchBack {
  animation: stretchBack 0.3s forwards;
}

/* Keyframes for slide-in animation */
@keyframes slideIn {
  from {
    top: -50px;
    opacity: 0;
  }
  to {
    top: 15px;
    opacity: 1;
  }
}

/* Keyframes for stretch-back animation */
@keyframes stretchBack {
  from {
    top: 15px;
    width: 80%;
    transform: translateX(-50%);
  }
  to {
    top: 0;
    width: 100%;
    transform: translateX(0);
  }
}
</style>
