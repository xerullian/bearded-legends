export default function isComponent(object) {
  return (
    typeof object === 'function' ||
    (typeof object === 'object' && object !== null && 'type' in object)
  );
}
