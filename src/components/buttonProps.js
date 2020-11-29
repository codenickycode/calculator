import { ReactComponent as SVGclear } from './svg/buttons/no_shadow/svg-clear.svg';
import { ReactComponent as SVGdivide } from './svg/buttons/no_shadow/svg-divide.svg';
import { ReactComponent as SVGmult } from './svg/buttons/no_shadow/svg-mult.svg';
import { ReactComponent as SVGseven } from './svg/buttons/no_shadow/svg-seven.svg';
import { ReactComponent as SVGeight } from './svg/buttons/no_shadow/svg-eight.svg';
import { ReactComponent as SVGnine } from './svg/buttons/no_shadow/svg-nine.svg';
import { ReactComponent as SVGminus } from './svg/buttons/no_shadow/svg-minus.svg';
import { ReactComponent as SVGfour } from './svg/buttons/no_shadow/svg-four.svg';
import { ReactComponent as SVGfive } from './svg/buttons/no_shadow/svg-five.svg';
import { ReactComponent as SVGsix } from './svg/buttons/no_shadow/svg-six.svg';
import { ReactComponent as SVGplus } from './svg/buttons/no_shadow/svg-plus.svg';
import { ReactComponent as SVGone } from './svg/buttons/no_shadow/svg-one.svg';
import { ReactComponent as SVGtwo } from './svg/buttons/no_shadow/svg-two.svg';
import { ReactComponent as SVGthree } from './svg/buttons/no_shadow/svg-three.svg';
import { ReactComponent as SVGzero } from './svg/buttons/no_shadow/svg-zero.svg';
import { ReactComponent as SVGdec } from './svg/buttons/no_shadow/svg-dec.svg';
import { ReactComponent as SVGeq } from './svg/buttons/no_shadow/svg-eq.svg';

export const buttonProps = [
  {
    id: 'clear',
    class: 'btn',
    input: 'Delete',
    label: 'AC',
    svg: <SVGclear />,
  },
  {
    id: 'divide',
    class: 'btn op',
    input: '/',
    label: '/',
    svg: <SVGdivide />,
  },
  {
    id: 'mult',
    class: 'btn op',
    input: '*',
    label: 'x',
    svg: <SVGmult />,
  },
  {
    id: 'seven',
    class: 'btn num',
    input: '7',
    label: '7',
    svg: <SVGseven />,
  },
  {
    id: 'eight',
    class: 'btn num',
    input: '8',
    label: '8',
    svg: <SVGeight />,
  },
  {
    id: 'nine',
    class: 'btn num',
    input: '9',
    label: '9',
    svg: <SVGnine />,
  },
  {
    id: 'min',
    class: 'btn op',
    input: '-',
    label: '-',
    svg: <SVGminus />,
  },
  {
    id: 'four',
    class: 'btn num',
    input: '4',
    label: '4',
    svg: <SVGfour />,
  },
  {
    id: 'five',
    class: 'btn num',
    input: '5',
    label: '5',
    svg: <SVGfive />,
  },
  {
    id: 'six',
    class: 'btn num',
    input: '6',
    label: '6',
    svg: <SVGsix />,
  },
  {
    id: 'plus',
    class: 'btn op',
    input: '+',
    label: '+',
    svg: <SVGplus />,
  },
  {
    id: 'one',
    class: 'btn num',
    input: '1',
    label: '1',
    svg: <SVGone />,
  },
  {
    id: 'two',
    class: 'btn num',
    input: '2',
    label: '2',
    svg: <SVGtwo />,
  },
  {
    id: 'three',
    class: 'btn num',
    input: '3',
    label: '3',
    svg: <SVGthree />,
  },
  {
    id: 'eq',
    class: 'btn',
    input: 'Enter',
    label: '=',
    svg: <SVGeq />,
  },
  {
    id: 'zero',
    class: 'btn num',
    input: '0',
    label: '0',
    svg: <SVGzero />,
  },
  {
    id: 'dec',
    class: 'btn num',
    input: '.',
    label: '.',
    svg: <SVGdec />,
  },
];
