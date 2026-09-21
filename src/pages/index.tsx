import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Layout title="Home" description="Phoenix Admin API Documentation">
        <div className={`${styles.hero}  homepage`}>
          <div className={styles.gradientBlur1} />
          <div className={styles.gradientBlur2} />
          <div className={styles.gradientBlur3} />

          <div className={styles.container}>
            

            <h1 className={styles.title}>
              Build faster with
              <br />
              <span className={styles.titleGradient}>the Phoenix Admin API</span>
            </h1>

            <p className={styles.subtitle}>
              A Rust-powered REST API for managing and integrating platform services, 
              built with API key authentication and a growing set of endpoints.
            </p>

            <div className={styles.buttons}>
              <a href="/docs/intro" className={styles.primaryBtn}>
                <span>Read the Docs</span>
                <span className={styles.arrow}>→</span>
              </a>
              <a
                href="/postman/collection.json"
                download="Phoenix-Admin-API.postman_collection.json"
                className={styles.secondaryBtn}
              >
                <svg
                  className={styles.btnIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                <span>Download Postman Collection</span>
              </a>
              <a
                href="https://github.com/Yukthi-Systems/Phoenix-External-API"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <span>API Source on GitHub</span>
              </a>
              <a
                href="https://github.com/Yukthi-Systems/Phoenix-External-API-Docs"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryBtn}
              >
                <span>Docs Source on GitHub</span>
              </a>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={`${styles.statDot} ${styles.green}`} />
                <span>Built with Rust</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <div className={`${styles.statDot} ${styles.blue}`} />
                <span>API Key Auth</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <div className={`${styles.statDot} ${styles.violet}`} />
                <span>RESTful Architecture</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <FeatureCard
                icon="⚡"
                title="Developer Experience"
                description="Intuitive API design with clear documentation and code samples in cURL, Node.js, and Python."
              />
              <FeatureCard
                icon="🔐"
                title="Built with Rust"
                description="Memory-safe by design, with API key authentication scoped to your organization's data."
              />
              <FeatureCard
                icon="🚀"
                title="Actively Developed"
                description="A growing set of endpoints with Redis-backed caching. Currently in early-stage development — request and response shapes may still change."
              />
            </div>
          </div>
        </div>

        <div className={styles.endpoints}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>API Endpoints</h2>
              <p className={styles.sectionSubtitle}>
                A growing REST API for email infrastructure, in early-stage development
              </p>
            </div>

            <div className={styles.endpointGrid}>
              {[
                {
                  name: "API Health",
                  desc: "Verify the API, database, and cache are reachable",
                  path: "/docs/api/health",
                  category: "System",
                },
                {
                  name: "Self",
                  desc: "Inspect your API key's organization and permissions",
                  path: "/docs/api/self",
                  category: "Auth",
                },
                {
                  name: "Organization",
                  desc: "Read your organization's quota and enabled services",
                  path: "/docs/api/organization",
                  category: "Core",
                },
                {
                  name: "Domains",
                  desc: "List domains and update domain settings",
                  path: "/docs/api/domains",
                  category: "Core",
                },
                {
                  name: "Identities",
                  desc: "Manage identities and reset passwords",
                  path: "/docs/api/identities",
                  category: "Core",
                },
                {
                  name: "Departments",
                  desc: "Full CRUD for organizing identities",
                  path: "/docs/api/departments",
                  category: "Core",
                },
                {
                  name: "Mailboxes",
                  desc: "Create, list, update, delete, and resize mailbox storage quotas",
                  path: "/docs/api/mailbox",
                  category: "Core",
                },
              ].map((endpoint, idx) => (
                <a
                  key={idx}
                  href={`${endpoint.path}`}
                  className={styles.endpointCard}
                >
                  <div className={styles.endpointContent}>
                    <div className={styles.endpointHeader}>
                      <h3 className={styles.endpointTitle}>{endpoint.name}</h3>
                      {/* <span className={styles.endpointCategory}>{endpoint.category}</span> */}
                    </div>
                    <p className={styles.endpointDesc}>{endpoint.desc}</p>
                  </div>
                  <span className={styles.endpointArrow}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </Layout>

      <style>
        {`
 
 @media (min-width: 1024px){

 .navbar {
  position: absolute;
  background: transparent;
  box-shadow: none;
  border: none;
  width: 100%;
  max-width: 1024px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.navbar__inner {
  padding: 1.5rem 0;
}
 }

 .navbar__search {
 display: none !important;
}
        
`}
      </style>
    </>
  );
}
