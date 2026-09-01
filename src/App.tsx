import {
  AtomicCommerceInterface,
  AtomicCommerceBreadbox,
  AtomicCommerceDidYouMean,
  AtomicCommerceFacets,
  AtomicCommerceLayout,
  AtomicCommerceNoProducts,
  AtomicCommercePager,
  AtomicCommerceProductList,
  AtomicCommerceQuerySummary,
  AtomicCommerceRefineToggle,
  AtomicLayoutSection,
} from '@coveo/atomic-react/commerce'
import { getEngine, MissingApiKeyError } from './engine'
import { HeroSection } from './components/HeroSection'
import { ProductCard } from './components/ProductCard'
import { ConfigurationPanel } from './components/ConfigurationPanel'
import { RobotFilterBar } from './components/RobotFilterBar'
import { SearchBootstrap } from './components/SearchBootstrap'
import { KnowledgePanel } from './components/KnowledgePanel'
import { PerPageControl } from './components/PerPageControl'
import { SortControl } from './components/SortControl'
import './styles.css'

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="setup">
      <h1>Configuration needed</h1>
      <p>{message}</p>
      <pre>
        cp .env.example .env{'\n'}# then add VITE_COVEO_API_KEY
      </pre>
    </div>
  )
}

export default function App() {
  let engine
  try {
    engine = getEngine()
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      return <SetupNotice message={error.message} />
    }
    throw error
  }

  return (
    <div className="app">
      <header className="masthead">
        <div className="masthead__inner">
          <div className="brand">
            <span className="brand__mark" aria-hidden="true" />
            <div>
              <span className="brand__name">RoboMotion Industries</span>
              <span className="brand__tag">Industrial robotics · Parts &amp; service</span>
            </div>
          </div>
          <nav className="masthead__nav" aria-label="Primary">
            <a href="#search">Catalogue</a>
            <a href="#search">Support</a>
            <a href="#search">Contact sales</a>
          </nav>
        </div>
      </header>

      <div id="search" />
      <AtomicCommerceInterface engine={engine} type="search">
        <SearchBootstrap />
        <RobotFilterBar placement="mobile" />
        <AtomicCommerceLayout>
          <AtomicLayoutSection section="search">
            <HeroSection />
          </AtomicLayoutSection>

          <AtomicLayoutSection section="facets">
            <RobotFilterBar placement="sidebar" />
            <AtomicCommerceFacets collapseFacetsAfter={-1} />
          </AtomicLayoutSection>

          <AtomicLayoutSection section="main">
            <AtomicLayoutSection section="status">
              <AtomicCommerceBreadbox />
              <AtomicCommerceQuerySummary />
              <div className="statusbar__controls">
                <AtomicCommerceRefineToggle />
                <SortControl />
              </div>
              <AtomicCommerceDidYouMean />
            </AtomicLayoutSection>

            <AtomicLayoutSection section="products">
              <AtomicCommerceProductList
                display="grid"
                density="normal"
                imageSize="small"
                numberOfPlaceholders={9}
                template={(product) => ({
                  contentTemplate: <ProductCard product={product} />,
                  linkTemplate: <span />,
                })}
              />
              <AtomicCommerceNoProducts />
            </AtomicLayoutSection>

            <AtomicLayoutSection section="pagination">
              <div className="pagination-bar">
                <AtomicCommercePager />
                <PerPageControl />
              </div>
            </AtomicLayoutSection>
          </AtomicLayoutSection>
        </AtomicCommerceLayout>
      </AtomicCommerceInterface>

      <ConfigurationPanel />
      <KnowledgePanel />
    </div>
  )
}
