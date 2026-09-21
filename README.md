# Qianru Li — personal research website

A responsive academic portfolio for [Qianru Li](https://github.com/Pangolin112), with research visuals, publications, project links, education and research affiliations, and a prominent invitation for PhD opportunities.

Plain HTML, CSS, and JavaScript. No build step, framework, analytics, or runtime third-party dependencies. Images, video, institution logos, and fonts are served locally. Core content and links remain usable with JavaScript disabled.

## Preview locally

From this directory:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. You can also open `index.html` directly for a basic preview.

## Publish on GitHub Pages

Push the website files to this repository's `main` branch. In **Settings → Pages**, select **Deploy from a branch**, then **main / (root)**. The site is prepared for <https://pangolin112.github.io/>. `.nojekyll` allows direct static hosting. No secrets or build dependencies are needed.

## Updating content

- **`index.html`**: biography, PhD availability, email, news, publication metadata, project cards, experience, social links, and search/social metadata. Update the filter counts when adding or removing work.
- **`styles.css`**: responsive layout, colors, typography, reduced-motion support, and print styles.
- **`script.js`**: research filters, mobile navigation, BibTeX entries, clipboard interaction, and the CinemaTraj video dialog.
- **`assets/`**: local photos, research figures, demo video, logos, and self-hosted fonts. Keep attribution below current when replacing assets.

The publications have direct paper/project links and accessible BibTeX dialogs. Research filters announce the visible work count. The demo only plays after an explicit click, pauses when its dialog closes, and does not automatically start for visitors who prefer reduced motion.

## Content sources and asset attribution

Public sources were checked on 21 September 2026:

| Content or asset | Source |
| --- | --- |
| Name, TUM master's status, Munich location, email, and profile photo | [GitHub profile](https://github.com/Pangolin112), [profile README](https://github.com/Pangolin112/Pangolin112), [original photo](https://avatars.githubusercontent.com/u/57064279?v=4) |
| Academic profile and research interests | [Google Scholar](https://scholar.google.com/citations?hl=en&user=w63MkEcAAAAJ) |
| Degrees, education dates, Huawei thesis and internship, TUM research internship | [LinkedIn](https://www.linkedin.com/in/qianru-li-14b79b2a4/) profile text supplied directly by the owner |
| CinemaTraj title, authors, ACM Multimedia 2026 venue, affiliation, teaser, and demo | [Project page](https://cinematraj.github.io/), [paper](https://arxiv.org/abs/2607.26910), [code](https://github.com/Pangolin112/CinemaTraj) |
| VideoReloc metadata, affiliation, and teaser | [Project page](https://videoreloc.github.io/), [arXiv preprint](https://arxiv.org/abs/2609.21804) |
| 4OTex description, deer figure, report, and results | [Repository](https://github.com/Pangolin112/4OTex), [visual results](https://philipsdeng.github.io/4DTEX_results/) |
| Splatter Scene description, poster, and report | [Repository](https://github.com/Pangolin112/SplatterScene) |
| Anamorphic Scene description and guided research year | [Repository](https://github.com/Pangolin112/AnamorphicScene) |
| TUM logo | [Official TUM website](https://www.tum.de/en/), [original SVG](https://www.tum.de/typo3conf/ext/in2template/Resources/Public/Images/Backend/tum-logo.svg) |
| Huawei logo | [Official Huawei website](https://www.huawei.com/en/) |
| Southeast University logo | [Official university website](https://www.seu.edu.cn/english/), [original SVG](https://www.seu.edu.cn/_upload/tpl/0c/ea/3306/template3306/images/logo.svg) |
| DM Sans and Instrument Serif | [Google Fonts](https://fonts.google.com/); SIL Open Font License files in `assets/fonts/` |

CinemaTraj's author list and proceedings citation follow its project page, which differs from the initially indexed arXiv/Scholar author list. VideoReloc is labeled as a preprint, without assigning an unverified conference venue.

LinkedIn did not permit automated access; the owner supplied the relevant profile text. Education and experience use those confirmed roles and dates. Huawei employment is located in Munich, as supplied by the owner. The research papers separately list Dresden affiliations. TUM education is dated October 2023–July 2026, and the Huawei master's thesis is listed as March 2026–present, matching the supplied profile without assuming a graduation status. The partial grade shown in the profile is omitted.

The Anamorphic Scene repository has no public project teaser. Its locally authored SVG is explicitly labeled **Concept illustration**, and does not claim to show an experimental result. The Splatter Scene card displays a crop of the original poster via CSS; its report remains linked for the complete context. WebP figures and the silent MP4 demo are web-optimized versions of the original project media. The Southeast University SVG is framed to show its original emblem, and the official white TUM logo appears on a blue background. Project media and university/company logos retain their original ownership.
