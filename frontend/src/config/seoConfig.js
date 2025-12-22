/**
 * SEO Configuration for ToolsHub
 * Centralized SEO metadata for all tools and pages
 */

export const siteConfig = {
  name: 'ToolsHub',
  url: 'https://toolshub.me',
  description: 'Free online tools for PDF conversion, image editing, video processing, and document management. Fast, secure, and 100% free.',
  ogImage: '/og-image.jpg',
  twitter: '@toolshub',
  lang: 'en'
};

/**
 * Tool Categories Configuration
 */
export const categories = {
  pdf: {
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Comprehensive suite of free PDF tools for converting, merging, compressing, and editing PDF files online',
    icon: 'FileText',
    color: 'blue',
    keywords: ['pdf tools', 'pdf converter', 'pdf editor', 'pdf utility', 'online pdf tools']
  },
  image: {
    name: 'Image Tools',
    slug: 'image-tools',
    description: 'Professional image editing tools for compression, resizing, format conversion, and background removal',
    icon: 'Image',
    color: 'green',
    keywords: ['image tools', 'photo editor', 'image converter', 'compress image', 'resize image']
  },
  video: {
    name: 'Video Tools',
    slug: 'video-tools',
    description: 'Powerful video processing tools for conversion, compression, and audio extraction',
    icon: 'Video',
    color: 'purple',
    keywords: ['video tools', 'video converter', 'video compressor', 'video editor', 'video to audio']
  },
  audio: {
    name: 'Audio Tools',
    slug: 'audio-tools',
    description: 'Professional audio tools for format conversion and compression',
    icon: 'Music',
    color: 'orange',
    keywords: ['audio tools', 'mp3 converter', 'audio converter', 'compress audio', 'audio editor']
  },
  document: {
    name: 'Document Tools',
    slug: 'document-tools',
    description: 'Convert and manage Word, Excel, TXT, and other document formats effortlessly',
    icon: 'FileText',
    color: 'indigo',
    keywords: ['document converter', 'word to pdf', 'excel converter', 'docx converter', 'document tools']
  }
};

/**
 * Tool Metadata Configuration
 */
export const toolsMetadata = {
  // PDF TOOLS
  'pdf-to-word': {
    name: 'PDF to Word Converter',
    title: 'Convert PDF to Word Online Free - PDF to DOCX Converter',
    description: 'Convert PDF to Word (DOCX) instantly with our free online converter. Maintain formatting, fonts, and layout. No email required, 100% secure.',
    keywords: ['pdf to word', 'pdf to docx', 'convert pdf to word', 'pdf converter', 'pdf to doc'],
    longTailKeywords: ['how to convert pdf to word', 'pdf to word converter free', 'convert pdf to editable word'],
    category: 'pdf',
    faqs: [
      {
        question: 'How do I convert PDF to Word?',
        answer: 'Upload your PDF file, click convert, and download the Word document. Our tool preserves formatting and layout automatically.'
      },
      {
        question: 'Is the PDF to Word converter free?',
        answer: 'Yes, our PDF to Word converter is completely free with no file size limits or conversion restrictions.'
      },
      {
        question: 'Will formatting be preserved?',
        answer: 'Yes, our advanced converter maintains text formatting, images, tables, and document layout.'
      },
      {
        question: 'Is it safe to convert PDF online?',
        answer: 'Absolutely. Files are processed securely and automatically deleted after conversion. We never store or share your documents.'
      }
    ],
    features: [
      'Instant PDF to Word conversion',
      'Preserves formatting and layout',
      'No file size limits',
      'Secure and private',
      'No registration required',
      'Batch conversion support'
    ]
  },
  'word-to-pdf': {
    name: 'Word to PDF Converter',
    title: 'Convert Word to PDF Online Free - DOCX to PDF Converter',
    description: 'Convert Word documents to PDF instantly. Preserve formatting, images, and fonts. Free online DOCX to PDF converter with no limits.',
    keywords: ['word to pdf', 'docx to pdf', 'convert word to pdf', 'doc to pdf', 'word converter'],
    longTailKeywords: ['how to convert word to pdf', 'word to pdf converter free', 'convert docx to pdf online'],
    category: 'pdf',
    faqs: [
      {
        question: 'How to convert Word to PDF?',
        answer: 'Simply upload your Word document (.doc or .docx), click convert, and download your PDF file instantly.'
      },
      {
        question: 'Does it work with all Word versions?',
        answer: 'Yes, our converter supports all Word formats including DOC and DOCX from any Microsoft Word version.'
      },
      {
        question: 'Will fonts and images be preserved?',
        answer: 'Yes, all formatting, fonts, images, tables, and layouts are perfectly preserved in the PDF output.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'No, you can convert Word documents of any size to PDF without restrictions.'
      }
    ],
    features: [
      'Fast Word to PDF conversion',
      'Maintains original formatting',
      'Unlimited conversions',
      'Support for DOC and DOCX',
      'No watermarks added',
      'Cross-platform compatibility'
    ]
  },
  'merge-pdf': {
    name: 'Merge PDF Files',
    title: 'Merge PDF Files Online Free - Combine PDFs into One',
    description: 'Merge multiple PDF files into one document online. Free PDF merger tool - no software installation needed. Fast, secure, and easy to use.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge pdf files'],
    longTailKeywords: ['how to merge pdf files', 'combine multiple pdfs', 'merge pdf online free'],
    category: 'pdf',
    faqs: [
      {
        question: 'How do I merge multiple PDFs?',
        answer: 'Upload 2 or more PDF files, arrange them in your desired order, click merge, and download the combined PDF.'
      },
      {
        question: 'Is there a limit on how many PDFs I can merge?',
        answer: 'No, you can merge unlimited PDF files in a single operation.'
      },
      {
        question: 'Will the quality be affected?',
        answer: 'No, merging preserves the original quality of all PDF documents without any degradation.'
      },
      {
        question: 'Can I change the order of PDFs?',
        answer: 'Yes, you can easily drag and drop to rearrange the order of PDFs before merging.'
      }
    ],
    features: [
      'Merge unlimited PDF files',
      'Drag and drop reordering',
      'Maintains original quality',
      'No file size restrictions',
      'Fast processing',
      'Secure merging'
    ]
  },
  'compress-pdf': {
    name: 'Compress PDF',
    title: 'Compress PDF Online Free - Reduce PDF File Size',
    description: 'Reduce PDF file size online without losing quality. Free PDF compressor with smart compression. Make PDFs smaller for email and sharing.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'optimize pdf'],
    longTailKeywords: ['how to compress pdf', 'reduce pdf file size online', 'compress pdf without losing quality'],
    category: 'pdf',
    faqs: [
      {
        question: 'How much can I compress my PDF?',
        answer: 'Compression varies by content, but typically reduces file size by 40-70% while maintaining readability.'
      },
      {
        question: 'Will compression reduce PDF quality?',
        answer: 'Our smart compression optimizes file size while preserving text clarity and image quality at acceptable levels.'
      },
      {
        question: 'Can I compress multiple PDFs at once?',
        answer: 'Yes, you can compress multiple PDF files simultaneously with batch processing.'
      },
      {
        question: 'What is the maximum file size?',
        answer: 'There is no maximum file size limit for PDF compression on our platform.'
      }
    ],
    features: [
      'Smart PDF compression',
      'Maintains readability',
      'Batch compression',
      'No size limits',
      'Fast processing',
      'Preview before download'
    ]
  },
  'split-pdf': {
    name: 'Split PDF',
    title: 'Split PDF Online Free - Extract Pages from PDF',
    description: 'Split PDF into multiple files or extract specific pages. Free online PDF splitter tool. No software installation required.',
    keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'divide pdf', 'separate pdf pages'],
    longTailKeywords: ['how to split pdf', 'extract pages from pdf', 'split pdf into multiple files'],
    category: 'pdf',
    faqs: [
      {
        question: 'How do I split a PDF?',
        answer: 'Upload your PDF, select pages or page ranges to split, and download individual PDF files.'
      },
      {
        question: 'Can I extract specific pages?',
        answer: 'Yes, you can extract any specific pages or page ranges from your PDF document.'
      },
      {
        question: 'Is there a page limit?',
        answer: 'No, you can split PDFs with any number of pages without restrictions.'
      }
    ],
    features: [
      'Split by page range',
      'Extract specific pages',
      'Multiple output files',
      'Unlimited pages',
      'Fast processing',
      'No quality loss'
    ]
  },
  'pdf-ocr': {
    name: 'PDF OCR',
    title: 'PDF OCR Online Free - Convert Scanned PDF to Text',
    description: 'Extract text from scanned PDFs and images with OCR. Convert image-based PDFs to searchable, editable text. Free online OCR tool.',
    keywords: ['pdf ocr', 'ocr pdf', 'pdf to text', 'extract text from pdf', 'scanned pdf to text'],
    longTailKeywords: ['convert scanned pdf to text', 'pdf ocr online free', 'extract text from image pdf'],
    category: 'pdf',
    faqs: [
      {
        question: 'What is PDF OCR?',
        answer: 'OCR (Optical Character Recognition) converts scanned documents and image-based PDFs into searchable, editable text.'
      },
      {
        question: 'What languages are supported?',
        answer: 'Our OCR tool supports 100+ languages including English, Spanish, French, German, Chinese, and more.'
      },
      {
        question: 'How accurate is the OCR?',
        answer: 'OCR accuracy is typically 95-99% for clear, high-quality scanned documents.'
      }
    ],
    features: [
      'Multi-language OCR',
      'High accuracy',
      'Searchable PDF output',
      'Batch processing',
      'Preserves layout',
      '100+ languages'
    ]
  },
  'protect-pdf': {
    name: 'Protect PDF',
    title: 'Protect PDF with Password - Encrypt PDF Online Free',
    description: 'Protect PDF files with password encryption. Add password security to PDFs online. Free PDF encryption tool with AES-256 encryption.',
    keywords: ['protect pdf', 'password protect pdf', 'encrypt pdf', 'pdf security', 'lock pdf'],
    longTailKeywords: ['how to password protect pdf', 'add password to pdf', 'encrypt pdf online'],
    category: 'pdf',
    faqs: [
      {
        question: 'How do I password protect a PDF?',
        answer: 'Upload your PDF, set a password, choose security settings, and download the protected PDF file.'
      },
      {
        question: 'What encryption is used?',
        answer: 'We use industry-standard AES-256 encryption for maximum security.'
      },
      {
        question: 'Can I restrict PDF permissions?',
        answer: 'Yes, you can restrict printing, editing, copying, and other permissions.'
      }
    ],
    features: [
      'AES-256 encryption',
      'Password protection',
      'Permission controls',
      'Secure processing',
      'No password stored',
      'Unlimited protection'
    ]
  },
  'unlock-pdf': {
    name: 'Unlock PDF',
    title: 'Unlock PDF Online Free - Remove PDF Password',
    description: 'Remove password protection from PDF files. Unlock secured PDFs instantly. Free online PDF password remover tool.',
    keywords: ['unlock pdf', 'remove pdf password', 'pdf password remover', 'decrypt pdf', 'unlock secured pdf'],
    longTailKeywords: ['how to unlock pdf', 'remove password from pdf', 'unlock pdf online'],
    category: 'pdf',
    faqs: [
      {
        question: 'How do I unlock a PDF?',
        answer: 'Upload the password-protected PDF, enter the password if you know it, and download the unlocked file.'
      },
      {
        question: 'Can you unlock PDFs without password?',
        answer: 'We can only remove restrictions if you own the PDF or have permission. Owner passwords require authentication.'
      },
      {
        question: 'Is unlocking PDFs legal?',
        answer: 'Yes, if you own the PDF or have permission to modify it. We do not support unauthorized access.'
      }
    ],
    features: [
      'Remove PDF password',
      'Fast unlocking',
      'Preserve formatting',
      'Secure process',
      'No software needed',
      'Legal compliance'
    ]
  },

  // IMAGE TOOLS
  'compress-image': {
    name: 'Image Compressor',
    title: 'Compress Images Online Free - Reduce Image File Size',
    description: 'Compress JPEG, PNG, WebP images online without losing quality. Free image optimizer reduces file size by up to 90%. Bulk compression supported.',
    keywords: ['compress image', 'image compressor', 'reduce image size', 'optimize image', 'image optimizer'],
    longTailKeywords: ['how to compress image', 'compress image without losing quality', 'reduce jpeg size'],
    category: 'image',
    faqs: [
      {
        question: 'How much can images be compressed?',
        answer: 'Typically 40-90% compression depending on the image type and content, while maintaining visual quality.'
      },
      {
        question: 'Which formats are supported?',
        answer: 'We support JPEG, PNG, WebP, GIF, and SVG image formats for compression.'
      },
      {
        question: 'Will compression affect image quality?',
        answer: 'Our smart compression maintains visual quality while significantly reducing file size.'
      },
      {
        question: 'Can I compress multiple images at once?',
        answer: 'Yes, you can compress up to 20 images simultaneously with our batch processor.'
      }
    ],
    features: [
      'Up to 90% compression',
      'Maintains quality',
      'Batch processing',
      'Multiple formats',
      'Preview comparison',
      'Adjustable quality'
    ]
  },
  'resize-image': {
    name: 'Image Resizer',
    title: 'Resize Images Online Free - Change Image Dimensions',
    description: 'Resize images online by pixels or percentage. Free image resizer maintains quality. Batch resize multiple images at once.',
    keywords: ['resize image', 'image resizer', 'change image size', 'scale image', 'image dimensions'],
    longTailKeywords: ['how to resize image', 'resize image online', 'change image dimensions'],
    category: 'image',
    faqs: [
      {
        question: 'How do I resize an image?',
        answer: 'Upload your image, enter new dimensions or percentage, choose quality settings, and download the resized image.'
      },
      {
        question: 'Will resizing reduce quality?',
        answer: 'Downscaling maintains quality well. Upscaling may reduce sharpness, but we use advanced algorithms to minimize quality loss.'
      },
      {
        question: 'Can I resize by percentage?',
        answer: 'Yes, you can resize by exact pixels, percentage, or maintain aspect ratio automatically.'
      }
    ],
    features: [
      'Pixel or percentage resize',
      'Maintain aspect ratio',
      'Batch resizing',
      'Multiple formats',
      'Quality preservation',
      'Preview changes'
    ]
  },
  'crop-image': {
    name: 'Crop Image',
    title: 'Crop Images Online Free - Image Cropping Tool',
    description: 'Crop images online with our free image cropper. Precise cropping tool with preset aspect ratios. Fast and easy to use.',
    keywords: ['crop image', 'image cropper', 'cut image', 'trim image', 'photo cropper'],
    longTailKeywords: ['how to crop image', 'crop image online', 'image cropping tool'],
    category: 'image',
    faqs: [
      {
        question: 'How do I crop an image?',
        answer: 'Upload your image, select the crop area by dragging, adjust as needed, and download the cropped image.'
      },
      {
        question: 'Can I use preset aspect ratios?',
        answer: 'Yes, we provide common presets like 1:1, 4:3, 16:9, and custom ratios.'
      },
      {
        question: 'Does cropping reduce quality?',
        answer: 'No, cropping only removes unwanted areas without affecting the quality of the remaining image.'
      }
    ],
    features: [
      'Drag-to-crop interface',
      'Preset aspect ratios',
      'Custom dimensions',
      'No quality loss',
      'Multiple formats',
      'Instant preview'
    ]
  },
  'bg-remover': {
    name: 'Background Remover',
    title: 'Remove Background from Image Free - AI Background Remover',
    description: 'Remove image background automatically with AI. Free online background remover tool. Perfect for product photos, portraits, and graphics.',
    keywords: ['remove background', 'background remover', 'remove image background', 'transparent background', 'ai background remover'],
    longTailKeywords: ['how to remove background from image', 'remove white background', 'make background transparent'],
    category: 'image',
    faqs: [
      {
        question: 'How does background removal work?',
        answer: 'Our AI automatically detects the subject and removes the background, creating a transparent PNG.'
      },
      {
        question: 'What images work best?',
        answer: 'Clear subjects with distinct edges work best. Portrait photos, product images, and logos produce excellent results.'
      },
      {
        question: 'Can I replace the background?',
        answer: 'Yes, after removal you can download with transparency or add a new background color.'
      },
      {
        question: 'Is it truly free?',
        answer: 'Yes, background removal is completely free with unlimited usage.'
      }
    ],
    features: [
      'AI-powered removal',
      'Automatic detection',
      'Transparent PNG output',
      'High accuracy',
      'Fast processing',
      'Multiple formats'
    ]
  },
  'image-type-converter': {
    name: 'Image Format Converter',
    title: 'Convert Image Formats Online Free - JPG, PNG, WebP Converter',
    description: 'Convert images between JPG, PNG, WebP, GIF, and more. Free online image format converter. Batch conversion supported.',
    keywords: ['image converter', 'convert image format', 'jpg to png', 'png to jpg', 'image format converter'],
    longTailKeywords: ['convert jpg to png', 'convert png to jpg', 'image format conversion'],
    category: 'image',
    faqs: [
      {
        question: 'What formats can I convert between?',
        answer: 'We support JPG, PNG, WebP, GIF, BMP, TIFF, and SVG conversions in any direction.'
      },
      {
        question: 'Will quality be preserved?',
        answer: 'Yes, we use lossless conversion methods to maintain maximum quality.'
      },
      {
        question: 'Can I convert multiple images?',
        answer: 'Yes, batch conversion is supported for processing multiple images simultaneously.'
      }
    ],
    features: [
      '10+ image formats',
      'Lossless conversion',
      'Batch processing',
      'Quality preservation',
      'Fast conversion',
      'No size limits'
    ]
  },
  'qr-generator': {
    name: 'QR Code Generator',
    title: 'QR Code Generator - Create Free QR Codes Online',
    description: 'Generate QR codes for URLs, text, WiFi, and more. Free QR code generator with customization options. Download in multiple formats.',
    keywords: ['qr code generator', 'create qr code', 'qr maker', 'generate qr code', 'qr code creator'],
    longTailKeywords: ['how to create qr code', 'qr code generator free', 'custom qr code maker'],
    category: 'image',
    faqs: [
      {
        question: 'What can I encode in a QR code?',
        answer: 'URLs, text, email, phone numbers, WiFi credentials, vCards, and more.'
      },
      {
        question: 'Can I customize QR code design?',
        answer: 'Yes, you can change colors, add logos, and adjust corner styles.'
      },
      {
        question: 'What formats are available?',
        answer: 'Download as PNG, SVG, or PDF in various resolutions.'
      },
      {
        question: 'Do QR codes expire?',
        answer: 'No, static QR codes never expire and work indefinitely.'
      }
    ],
    features: [
      'Multiple QR types',
      'Custom design',
      'High resolution',
      'Logo insertion',
      'Color customization',
      'Multiple formats'
    ]
  },

  // VIDEO TOOLS
  'video-to-audio': {
    name: 'Video to Audio Converter',
    title: 'Convert Video to Audio Online Free - Extract Audio from Video',
    description: 'Extract audio from video files. Convert MP4, AVI, MOV to MP3, AAC, WAV. Free online video to audio converter.',
    keywords: ['video to audio', 'extract audio from video', 'mp4 to mp3', 'convert video to audio', 'video audio converter'],
    longTailKeywords: ['how to extract audio from video', 'convert mp4 to mp3', 'get audio from video'],
    category: 'video',
    faqs: [
      {
        question: 'What video formats are supported?',
        answer: 'We support MP4, AVI, MOV, MKV, WMV, FLV, and more video formats.'
      },
      {
        question: 'What audio formats can I get?',
        answer: 'Export to MP3, AAC, WAV, OGG, FLAC, and M4A formats.'
      },
      {
        question: 'Will audio quality be preserved?',
        answer: 'Yes, we extract audio in its original quality or let you choose bitrate for smaller files.'
      }
    ],
    features: [
      'Multiple video formats',
      'Multiple audio outputs',
      'Original quality',
      'Fast extraction',
      'Batch processing',
      'No watermarks'
    ]
  },
  'video-converter': {
    name: 'Video Converter',
    title: 'Convert Video Formats Online Free - MP4, AVI, MOV Converter',
    description: 'Convert videos between formats online. Free video converter supports MP4, AVI, MOV, WMV, and more. Fast and easy conversion.',
    keywords: ['video converter', 'convert video', 'video format converter', 'mp4 converter', 'avi converter'],
    longTailKeywords: ['convert video format', 'video file converter', 'change video format'],
    category: 'video',
    faqs: [
      {
        question: 'What video formats are supported?',
        answer: 'We support MP4, AVI, MOV, MKV, WMV, FLV, WebM, and many more formats.'
      },
      {
        question: 'Can I adjust video quality?',
        answer: 'Yes, you can choose resolution, bitrate, and compression settings.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'We support files up to 2GB for free conversions.'
      }
    ],
    features: [
      '20+ video formats',
      'Quality settings',
      'Fast conversion',
      'Resolution options',
      'Batch conversion',
      'No watermarks'
    ]
  },
  'video-compressor': {
    name: 'Video Compressor',
    title: 'Compress Video Online Free - Reduce Video File Size',
    description: 'Reduce video file size online without losing quality. Free video compressor for MP4, AVI, MOV. Perfect for email and web sharing.',
    keywords: ['compress video', 'video compressor', 'reduce video size', 'shrink video', 'video optimizer'],
    longTailKeywords: ['how to compress video', 'reduce video file size', 'make video smaller'],
    category: 'video',
    faqs: [
      {
        question: 'How much can videos be compressed?',
        answer: 'Typically 40-80% reduction depending on the video content and original encoding.'
      },
      {
        question: 'Will compression affect quality?',
        answer: 'We use smart compression to maintain visual quality while significantly reducing file size.'
      },
      {
        question: 'What formats are supported?',
        answer: 'All major video formats including MP4, AVI, MOV, MKV, and WMV.'
      }
    ],
    features: [
      'Smart compression',
      'Quality preservation',
      'Multiple formats',
      'Adjustable settings',
      'Fast processing',
      'Batch compression'
    ]
  },

  // AUDIO TOOLS
  'mp3-converter': {
    name: 'MP3 Converter',
    title: 'Convert Audio to MP3 Online Free - Audio Converter',
    description: 'Convert any audio file to MP3 format online. Free audio converter supports WAV, AAC, OGG, FLAC, and more. High quality conversion.',
    keywords: ['mp3 converter', 'convert to mp3', 'audio converter', 'wav to mp3', 'audio to mp3'],
    longTailKeywords: ['convert audio to mp3', 'convert wav to mp3', 'audio format converter'],
    category: 'audio',
    faqs: [
      {
        question: 'What audio formats can be converted to MP3?',
        answer: 'We support WAV, AAC, OGG, FLAC, M4A, WMA, and many more audio formats.'
      },
      {
        question: 'Can I adjust MP3 quality?',
        answer: 'Yes, choose bitrates from 128kbps to 320kbps for quality vs file size balance.'
      },
      {
        question: 'Is batch conversion supported?',
        answer: 'Yes, convert multiple audio files to MP3 simultaneously.'
      }
    ],
    features: [
      'Multiple input formats',
      'Quality options',
      'Batch conversion',
      'Fast processing',
      'ID3 tag support',
      'No limits'
    ]
  },
  'audio-compressor': {
    name: 'Audio Compressor',
    title: 'Compress Audio Online Free - Reduce Audio File Size',
    description: 'Compress MP3, WAV, AAC audio files online. Free audio compressor reduces file size while maintaining quality. Perfect for podcasts and music.',
    keywords: ['compress audio', 'audio compressor', 'reduce audio size', 'shrink mp3', 'audio optimizer'],
    longTailKeywords: ['how to compress audio', 'reduce mp3 file size', 'make audio smaller'],
    category: 'audio',
    faqs: [
      {
        question: 'How much can audio be compressed?',
        answer: 'Compression varies by format, but typically 30-70% reduction while maintaining acceptable quality.'
      },
      {
        question: 'Which formats are supported?',
        answer: 'MP3, WAV, AAC, OGG, FLAC, M4A, and more audio formats.'
      },
      {
        question: 'Will compression affect audio quality?',
        answer: 'We use optimized compression algorithms to minimize quality loss while maximizing file size reduction.'
      }
    ],
    features: [
      'Smart compression',
      'Multiple formats',
      'Quality control',
      'Batch processing',
      'Fast compression',
      'Metadata preserved'
    ]
  },

  // DOCUMENT TOOLS
  'excel-to-pdf': {
    name: 'Excel to PDF Converter',
    title: 'Convert Excel to PDF Online Free - XLS to PDF Converter',
    description: 'Convert Excel spreadsheets to PDF online. Free XLS to PDF and XLSX to PDF converter. Preserves formatting and formulas.',
    keywords: ['excel to pdf', 'xls to pdf', 'xlsx to pdf', 'convert excel to pdf', 'spreadsheet to pdf'],
    longTailKeywords: ['convert excel spreadsheet to pdf', 'excel file to pdf', 'xls xlsx to pdf'],
    category: 'document',
    faqs: [
      {
        question: 'Does it work with all Excel versions?',
        answer: 'Yes, we support XLS (Excel 97-2003) and XLSX (Excel 2007 and later) formats.'
      },
      {
        question: 'Will formulas be preserved?',
        answer: 'Formulas are calculated and results are shown in the PDF. The PDF displays values, not formulas.'
      },
      {
        question: 'Can I convert multiple sheets?',
        answer: 'Yes, all sheets in your workbook will be converted to separate pages in the PDF.'
      }
    ],
    features: [
      'XLS and XLSX support',
      'Multiple sheets',
      'Preserves formatting',
      'Fast conversion',
      'No Excel required',
      'Secure processing'
    ]
  },
  'pdf-to-excel': {
    name: 'PDF to Excel Converter',
    title: 'Convert PDF to Excel Online Free - PDF to XLS Converter',
    description: 'Convert PDF tables to Excel spreadsheets. Free PDF to Excel converter extracts tables accurately. Edit data in Excel format.',
    keywords: ['pdf to excel', 'pdf to xls', 'pdf to xlsx', 'convert pdf to excel', 'pdf table to excel'],
    longTailKeywords: ['extract table from pdf', 'pdf to excel converter', 'convert pdf table to spreadsheet'],
    category: 'document',
    faqs: [
      {
        question: 'Can it extract tables from PDF?',
        answer: 'Yes, our tool intelligently detects and extracts tables from PDFs into Excel format.'
      },
      {
        question: 'What if the PDF has multiple tables?',
        answer: 'All tables are extracted and placed in separate sheets or columns in the Excel file.'
      },
      {
        question: 'Will formulas be included?',
        answer: 'PDFs contain static data, not formulas. You\'ll get the data values in Excel format.'
      }
    ],
    features: [
      'Table extraction',
      'Multiple tables',
      'Accurate conversion',
      'XLSX output',
      'Editable data',
      'Fast processing'
    ]
  },
  'txt-to-pdf': {
    name: 'TXT to PDF Converter',
    title: 'Convert Text to PDF Online Free - TXT to PDF Converter',
    description: 'Convert plain text files to PDF online. Free TXT to PDF converter with formatting options. Create professional PDFs from text.',
    keywords: ['txt to pdf', 'text to pdf', 'convert txt to pdf', 'text file to pdf', 'plain text to pdf'],
    longTailKeywords: ['convert text file to pdf', 'txt to pdf online', 'create pdf from text'],
    category: 'document',
    faqs: [
      {
        question: 'Can I format the text?',
        answer: 'Yes, you can choose font, size, margins, and alignment before conversion.'
      },
      {
        question: 'What encoding is supported?',
        answer: 'We support UTF-8, ASCII, and most common text encodings.'
      },
      {
        question: 'Will line breaks be preserved?',
        answer: 'Yes, all line breaks and formatting in your text file are maintained in the PDF.'
      }
    ],
    features: [
      'Format options',
      'Font selection',
      'UTF-8 support',
      'Preserves layout',
      'Fast conversion',
      'No size limits'
    ]
  },
  'pdf-to-txt': {
    name: 'PDF to Text Converter',
    title: 'Convert PDF to Text Online Free - Extract Text from PDF',
    description: 'Extract text from PDF files online. Free PDF to TXT converter. Perfect for editing and data extraction from PDF documents.',
    keywords: ['pdf to txt', 'pdf to text', 'extract text from pdf', 'convert pdf to text', 'pdf text extractor'],
    longTailKeywords: ['extract text from pdf file', 'pdf to plain text', 'get text from pdf'],
    category: 'document',
    faqs: [
      {
        question: 'Can it extract text from scanned PDFs?',
        answer: 'For scanned PDFs, use our PDF OCR tool to extract text from images.'
      },
      {
        question: 'Will formatting be preserved?',
        answer: 'Basic layout is preserved, but complex formatting is simplified to plain text.'
      },
      {
        question: 'What about PDF forms?',
        answer: 'Text from form fields and annotations can also be extracted.'
      }
    ],
    features: [
      'Fast extraction',
      'Preserves layout',
      'Multiple pages',
      'UTF-8 encoding',
      'Copy-friendly',
      'No limits'
    ]
  }
};

/**
 * Get tool metadata by slug
 */
export const getToolMetadata = (slug) => {
  return toolsMetadata[slug] || null;
};

/**
 * Get all tools in a category
 */
export const getToolsByCategory = (categorySlug) => {
  return Object.entries(toolsMetadata)
    .filter(([_, tool]) => tool.category === categorySlug)
    .map(([slug, tool]) => ({ slug, ...tool }));
};

/**
 * Get category by slug
 */
export const getCategory = (slug) => {
  return Object.values(categories).find(cat => cat.slug === slug);
};

/**
 * Generate breadcrumbs for a tool page
 */
export const generateBreadcrumbs = (toolSlug) => {
  const tool = getToolMetadata(toolSlug);
  if (!tool) return [];

  const category = categories[tool.category];
  if (!category) return [];
  
  return [
    { name: 'Home', url: 'https://toolshub.me' },
    { name: category.name, url: `https://toolshub.me/${category.slug}` },
    { name: tool.name, url: `https://toolshub.me/tools/${toolSlug}` }
  ];
};

/**
 * Generate related tools
 */
export const getRelatedTools = (toolSlug, limit = 3) => {
  const tool = getToolMetadata(toolSlug);
  if (!tool) return [];

  const sameCategory = getToolsByCategory(tool.category)
    .filter(t => t.slug !== toolSlug)
    .slice(0, limit);

  return sameCategory;
};
