export default function ErrorElement() {
  throw new Error('Упс, произошла ошибка.');
  return <div />;
}
