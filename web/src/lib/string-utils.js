export default function ucfirst(str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`;
}
