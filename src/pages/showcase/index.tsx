import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {SHOWCASE, ShowcaseItem} from '@site/src/data/showcase';
import useBaseUrl from '@docusaurus/useBaseUrl';

function Cards({items}: {items: ShowcaseItem[]}) {
  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.title} className="col col--4 margin-bottom--lg">
          <div className="card card-elev">
            <div className="card__image">
              <img src={useBaseUrl(item.image)} alt={item.title} />
            </div>
            <div className="card__body">
              <h3 className="card-title">{item.title}</h3>
              <p className="card-desc">{item.description}</p>
            </div>
            <div className="card__footer" style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
              <Link className="button button--primary button--sm" href={item.url} target="_blank" rel="noopener noreferrer">Fab listing</Link>
              {item.docsPath ? <Link className="button button--outline button--sm" to={item.docsPath}>Docs</Link> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Showcase(): JSX.Element {
  const plugins = SHOWCASE.filter(i => i.tags?.includes('plugin'));
  const environments = SHOWCASE.filter(i => i.tags?.includes('environment'));

  return (
    <Layout title="Showcase" description="Plugins and environment packs by Galidar Studio">
      <main className="container margin-vert--lg">
        <h1>Showcase</h1>
        <p>Explore all our Unreal Engine products — from <strong>Oceanology</strong> and <strong>Riverology</strong> plugins to complete <strong>Environment Packs</strong>.</p>

        <h2 className="section-title">Plugins</h2>
        <Cards items={plugins} />

        <h2 className="section-title" style={{marginTop: '2rem'}}>Environment Packs</h2>
        <Cards items={environments} />

        <p className="margin-top--lg">
          Want to be featured here with your project using our tools? Open a PR and add your card to <code>src/data/showcase.ts</code>.
        </p>
      </main>
    </Layout>
  );
}