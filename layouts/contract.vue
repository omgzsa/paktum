<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { schemas } from '@/utils/schemas'

const router = useRouter()
const route = useRoute()
const { headers } = useAppConfig()

const currentHeader = computed(() => {
    const header = headers.find((header) => header.link === route.path)

    return {
        title: header?.title,
        subTitle: header?.subTitle,
    }
})

const currentStep = ref(
    parseInt(route.fullPath.split('/').pop() as string) || 1,
)
const currentSchema = ref(schemas[currentStep.value - 1])

const { values, handleSubmit, isSubmitting, setFieldValue } = useForm({
    validationSchema: currentSchema,
    keepValuesOnUnmount: true,
})

// const isLeftAsideOpen = ref(false)
// const isRightAsideOpen = ref(false)

provide('currentStep', currentStep)
provide('setFieldValue', setFieldValue)

// Watch for changes in the route to update currentStep
watch(
    () => route.fullPath,
    (newPath) => {
        const newStep = parseInt(newPath.split('/').pop() as string)
        currentStep.value = newStep || 1
    },
)

function validateAndGo(step: number | null) {
    if (step) {
        handleSubmit(() => {
            currentStep.value = step
            router.push({ path: `/berleti/lepes/${step}` })
        })()
    } else {
        handleSubmit(() => {
            console.log(JSON.stringify(values, null, 2))
        })()
    }
}
</script>

<template>
    <div class="space-y-10">
        <AppHeader class="pb-10">
            <template #navigation>
                <AppNavDesktop />
            </template>
            <AppTitle
                :title="currentHeader.title"
                :sub-title="currentHeader.subTitle"
            />
        </AppHeader>

        <main>
            <UContainer as="section" class="relative space-y-10">
                <FormProgress
                    :current-step="currentStep"
                    :total-steps="schemas.length"
                />

                <form>
                    <slot />
                </form>

                <FormControls
                    :has-previous="currentStep > 1"
                    :is-last-step="currentStep === schemas.length"
                    :is-submitting="isSubmitting"
                    :current-step="currentStep"
                    @validate-and-go="validateAndGo"
                />
                <!-- <pre
                wrap
                class="bottom-0 right-0 w-full text-xs leading-tight"
            >
                {{ values }}
            </pre> -->
                <!-- Mobile Sticky Buttons -->
                <!-- <div class="fixed z-50 flex flex-col gap-2 bottom-4 right-4">
                <UButton
                    icon="i-heroicons-bars-3"
                    color="white"
                    variant="solid"
                    class="glass-effect"
                    @click="isLeftAsideOpen = true"
                />
                <UButton
                    icon="i-heroicons-ellipsis-vertical"
                    color="white"
                    variant="solid"
                    class="glass-effect"
                    @click="isRightAsideOpen = true"
                />
            </div> -->
                <AuthModal>
                    <AuthLogin />
                </AuthModal>
            </UContainer>
        </main>

        <footer>
            <!-- footer content -->
        </footer>
    </div>
</template>
