import { ImageResponse } from "@vercel/og";
import { getAllBlogSlugs, getBlogArticleBySlug } from "@/model/BlogServer";
import fs from "fs";
import path from "path";
import React from "react";

async function generateOGImages() {
  const slugs = getAllBlogSlugs();
  const outputDir = path.join(process.cwd(), "public", "__generated__", "og", "blog");

  // 出力ディレクトリを作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating OG images for ${slugs.length} blog posts...`);

  for (const { params } of slugs) {
    const slug = params.slug;
    const article = getBlogArticleBySlug(slug);

    if (!article) {
      console.warn(`Article not found for slug: ${slug}`);
      continue;
    }

    try {
      // OG画像を生成
      const imageResponse = new ImageResponse(
        React.createElement(
          "div",
          {
            style: {
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #616161 0%, #424242 100%)",
              position: "relative",
              padding: "40px"
            }
          },
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                width: "100%",
                height: "100%",
                borderRadius: "24px",
                padding: "80px 100px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
              }
            },
            React.createElement(
              "div",
              {
                style: {
                  fontSize: 48,
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "center",
                  lineHeight: 1.4,
                  maxWidth: "900px",
                  wordWrap: "break-word"
                }
              },
              article.title
            ),
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "40px"
                }
              },
              React.createElement("img", {
                src: "https://sakusaku3939.com/images/blog-header.jpg",
                alt: "icon",
                width: 32,
                height: 32,
                style: {
                  marginTop: "4px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }
              }),
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: 28,
                    color: "#254024",
                    fontWeight: "600"
                  }
                },
                "aokiti blog"
              )
            )
          )
        ),
        {
          width: 1200,
          height: 630
        }
      );

      // 画像をバッファに変換
      const buffer = await imageResponse.arrayBuffer();

      // ファイルに保存
      const outputPath = path.join(outputDir, `${slug}.png`);
      fs.writeFileSync(outputPath, Buffer.from(buffer));

      console.log(`✓ Generated: ${slug}.png`);
    } catch (error) {
      console.error(`Failed to generate OG image for ${slug}:`, error);
    }
  }

  console.log("OG image generation complete!");
}

generateOGImages().catch(console.error);
