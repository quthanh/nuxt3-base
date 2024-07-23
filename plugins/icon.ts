const svgIcons = import.meta.glob('@/assets/**/svg-icon/**/*.svg', {
  eager: true,
});

const findBySvgName = (name: string) => {
  return svgIcons[`/assets/svg-icon/${name}.svg`] as any;
};

const render = (name: string) => {
  return findBySvgName(name) ? findBySvgName(name)?.default : '';
};

export interface IconPlugin {
  render: (name: string) => string;
}

const icon: IconPlugin = {
  render,
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      icon: icon,
    },
  };
});
