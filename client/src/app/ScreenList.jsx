import { Link } from 'react-router-dom';
import { SCREENS } from './screens.js';
import { START } from './flow.js';

export default function ScreenList() {
  return (
    <main className="mx-auto flex max-w-list flex-col gap-1.5 px-5 pb-16 pt-8 font-suit">
      <h1 className="m-0 mb-4 text-2xl font-bold text-text">DRRRK</h1>
      <Link
        to={'/s/' + START}
        className="flex min-h-touch items-center rounded-xl bg-brand px-4 text-item font-bold text-brand-subtle no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        프로토타입 시작
      </Link>
      {SCREENS.map((s) => (
        <Link
          key={s.id}
          to={'/s/' + s.n}
          className="flex min-h-touch items-center rounded-xl bg-elevated px-4 text-item text-text no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {s.n}&nbsp;&nbsp;{s.name}
        </Link>
      ))}
    </main>
  );
}
