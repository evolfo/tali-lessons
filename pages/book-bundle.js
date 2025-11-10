import React from "react"

import loadable from '@loadable/component'

const StoreContent = loadable(() => import('../components/StoreContent'));

// This class is for the Ecwid bundles
class BookBundle extends React.Component {
  render() {
    return (
      <>
        <StoreContent />
      </>
    );
  }
}

export default BookBundle;