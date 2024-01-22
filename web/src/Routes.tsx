// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, PrivateSet } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="home">
        <Set wrap={ScaffoldLayout} title="Items" titleTo="items" buttonLabel="New Item" buttonTo="home">
          <Route path="/items/{id:Int}/edit" page={ItemEditItemPage} name="editItem" />
          <Route path="/items/{id:Int}" page={ItemItemPage} name="item" />
          <Route path="/items" page={ItemItemsPage} name="items" />
        </Set>
      </PrivateSet>
      <Set wrap={MainLayout}>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
