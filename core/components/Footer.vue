<template>
  <div class="bg-black w-full">
    <div class="main-container p-6 space-y-6">
      <div
        class="text-center text-base text-gray-400 border-gray-700 flex flex-col lg:flex-row gap-2 lg:justify-between"
      >
        <div>© {{ new Date().getFullYear() }} {{ $globalConfig.title }}. All rights reserved.</div>
        <a
          href="mailto:support@com"
          class="flex items-center justify-center gap-1 text-gray-400 hover:text-gray-300"
        >
          <Icon class="svg-line w-5 h-5" name="email"></Icon>
          support@com
        </a>
      </div>
    </div>
  </div>
</template>
