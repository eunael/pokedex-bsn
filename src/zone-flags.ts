/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
// eslint-disable-next-line no-underscore-dangle
interface WindowWithZone extends Window {
  __Zone_disable_customElements?: boolean;
}

(window as WindowWithZone).__Zone_disable_customElements = true;
