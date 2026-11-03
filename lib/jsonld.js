/**
 * Serialize a JSON-LD object for embedding in an inline <script> tag.
 *
 * Plain JSON.stringify is not safe here: several fields (blog titles,
 * descriptions, keywords) originate from the Substack RSS feed, and a value
 * containing "</script>" would close the tag early and let the rest of the
 * string run as page HTML. Escaping "<" and the JS line separators keeps the
 * payload valid JSON while making it impossible to break out of the script.
 */
export function serializeJsonLd(data) {
  return (JSON.stringify(data) ?? 'null')
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
