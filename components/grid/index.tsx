// 功能：网格容器与子项组件，统一网格间距与卡片比例
// 设计：引入细腻的过渡与淡入动画，保持极简与留白；支持响应式
import clsx from 'clsx';

function Grid(props: React.ComponentProps<'ul'>) {
  return (
    <ul
      {...props}
      className={clsx(
        'grid grid-flow-row gap-6 sm:gap-8 lg:gap-10',
        props.className
      )}
    >
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<'li'>) {
  return (
    <li
      {...props}
      className={clsx(
        'aspect-square transition-opacity animate-fade-in',
        props.className
      )}
    >
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
