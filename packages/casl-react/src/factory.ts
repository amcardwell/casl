import { createElement as h, ComponentClass, Consumer, StatelessComponent } from 'react';
import { AnyAbility } from '@casl/ability';
import { Can, BoundCanProps } from './Can';

interface BoundCanClass<T extends AnyAbility> extends ComponentClass<BoundCanProps<T>> {
  new (props: BoundCanProps<T>, context?: any): Can<T, true>
}

export function createCanBoundTo<T extends AnyAbility>(ability: T): BoundCanClass<T> {
  return class extends Can<T, true> {
    static defaultProps = { ability } as BoundCanClass<T>['defaultProps'];
  };
}

export function createContextualCan<T extends AnyAbility>(
  Getter: Consumer<T>
): StatelessComponent<BoundCanProps<T>> {
  return (props: BoundCanProps<T>) => h(Getter, null, (ability: T) => h(Can, {
    ability,
    ...props,
  } as any));
}
