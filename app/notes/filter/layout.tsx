// app> notes>filter> layout.tsx

import css from './Note.module.css';

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const NotesLayout = ({ children, sidebar }: Props) => {
  console.log('lay');

  return (
    <section className={css.layout}>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;
