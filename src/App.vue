<template>
    <Suspense>
        <template #default>
            <RouterView />
        </template>
        <template #fallback>
            <p>Loading...</p>
        </template>
    </Suspense>
</template>
