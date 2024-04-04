import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
  keywords?: string;
}

const BASE_URL = 'https://10mm.today';
const DEFAULT_OG_IMAGE = 'https://www.10mm.today/og-image.png';

/**
 * @description next/head를 사용하는 SEO 컴포넌트입니다. title, og, twitter 등 SEO에 필요한 태그를 렌더링 합니다.
 */
const SEO = ({ title, description, ogImage, keywords }: Props) => {
  const TITLE = title || '10MM';
  const DESCRIPTION = description || '10MM';

  const IMAGE = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="canonical" href={BASE_URL} />
      <link rel="icon" href="/favicon.ico" />

      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:url" content={BASE_URL} />

      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={IMAGE} />
    </Head>
  );
};

export default SEO;
