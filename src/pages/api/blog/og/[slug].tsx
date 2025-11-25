import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return new Response('Missing slug', { status: 400 });
    }

    // タイトルを取得（クエリパラメータから）
    const title = searchParams.get('title') || 'ブログ記事一覧';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(135deg, #616161 0%, #424242 100%)',
            position: 'relative',
            padding: '40px',
          }}
        >
          {/* 白い中央エリア */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
              borderRadius: '24px',
              padding: '80px 100px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* タイトル */}
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#000',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: '900px',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </div>
            
            {/* サイト名とアイコン */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '40px',
              }}
            >
              <img
                src="https://sakusaku3939.com/images/blog-header.jpg"
                alt="icon"
                width="32"
                height="32"
                style={{
                  marginTop: '4px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />

              <div
                style={{
                  fontSize: 28,
                  color: '#254024',
                  fontWeight: '600',
                }}
              >
                aokiti blog
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('OG Image generation error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
