<script setup lang="ts">
import { motion } from 'motion-v'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 767px)')

import Bg from '../public/svg/bg.svg'
import House1 from '../public/svg/house-1.svg'
import House2 from '../public/svg/house-2.svg'
import House3 from '../public/svg/house-3.svg'
import RentLeft from '../public/svg/rent-left.svg'
import RentRight from '../public/svg/rent-right.svg'
import Tree from '../public/svg/tree.svg'
import TreeBench from '../public/svg/tree-bench.svg'
</script>

<template>
    <!-- <ClientOnly> -->
    <UContainer class="mx-auto flex justify-center items-end pt-6">
        <div class="relative w-full flex items-end justify-center">
            <motion.img
                :src="Bg"
                class="absolute w-full"
                :initial="{ opacity: 0, y: -50 }"
                :animate="{ opacity: 1, y: 0 }"
            />

            <div class="relative flex items-end gap-4">
                <motion.img
                    :src="TreeBench"
                    class="w-24"
                    :initial="{ opacity: 0, scale: 0 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ delay: 0.9 }"
                />
                <div class="relative">
                    <motion.img
                        :src="House1"
                        class="w-32"
                        :initial="{ opacity: 0, scale: 0 }"
                        :animate="{ opacity: 1, scale: 1 }"
                        :transition="{ delay: 0.6 }"
                    />

                    <motion.img
                        :src="RentLeft"
                        class="absolute left-1/2 -translate-x-1/2 -top-14 w-16"
                        :initial="{ opacity: 0, y: -50 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ type: 'spring', delay: 1.8 }"
                    />
                </div>
                <motion.img
                    :src="Tree"
                    class="w-24"
                    :initial="{ opacity: 0, scale: 0 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ delay: 0.4 }"
                />

                <div v-if="!isMobile" class="relative">
                    <motion.img
                        :src="House2"
                        class="w-36"
                        :initial="{ opacity: 0, scale: 0 }"
                        :animate="{ opacity: 1, scale: 1 }"
                        :transition="{ delay: 0.7 }"
                    />
                </div>

                <div v-if="!isMobile" class="relative">
                    <motion.img
                        :src="House3"
                        class="w-40"
                        :initial="{ opacity: 0, scale: 0 }"
                        :animate="{ opacity: 1, scale: 1 }"
                        :transition="{ delay: 1.1 }"
                    />

                    <motion.img
                        :src="RentRight"
                        class="absolute left-1/2 -translate-x-1/2 -top-10 w-14"
                        :initial="{ opacity: 0, y: -50 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ type: 'spring', delay: 2 }"
                    />
                </div>
                <motion.img
                    v-if="!isMobile"
                    :src="Tree"
                    class="w-24"
                    :initial="{ opacity: 0, scale: 0 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ delay: 1.4 }"
                />
            </div>

            <motion.div
                class="absolute z-10 h-[2px] -bottom-[1.25px] left-0 w-full bg-black/60"
                :initial="{ opacity: 0, y: 50 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ delay: 0.3 }"
            />
        </div>
    </UContainer>
    <!-- </ClientOnly> -->
</template>
