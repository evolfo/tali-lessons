import React from "react"

import loadable from '@loadable/component'

const EcwidEmbed = loadable(() => import('../components/EcwidEmbed'));

// This class is for the Ecwid bundles
class BookBundle extends React.Component {
  render() {
    return (
      <>
        <EcwidEmbed />
      </>
    );
  }
}

export default BookBundle;