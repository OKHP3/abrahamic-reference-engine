import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import TraditionBrowser from './pages/TraditionBrowser'
import VerseLookup from './pages/VerseLookup'
import CrossTraditionCompare from './pages/CrossTraditionCompare'

export default function App() {
  return (
    <BrowserRouter basename="/abrahamic-reference-engine">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/browse" replace />} />
          <Route path="browse" element={<TraditionBrowser />} />
          <Route path="browse/:traditionSlug" element={<TraditionBrowser />} />
          <Route path="lookup" element={<VerseLookup />} />
          <Route path="compare" element={<CrossTraditionCompare />} />
          <Route path="*" element={<Navigate to="/browse" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
