import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // Brotli compression
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    // Bundle analyzer (optional, runs on build)
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html'
    })
  ],
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'image-vendor': ['browser-image-compression', 'react-easy-crop'],
          'qr-vendor': ['qrcode.react', 'qr-code-styling'],
          // Group PDF tools together
          'pdf-tools': [
            './src/pages/pdf/PdfToWord.jsx',
            './src/pages/pdf/WordToPdf.jsx',
            './src/pages/pdf/MergePdf.jsx',
            './src/pages/pdf/CompressPdf.jsx'
          ],
          // Group image tools together
          'image-tools': [
            './src/pages/imageTool/ImageCompressor.jsx',
            './src/pages/imageTool/ImageCropper.jsx',
            './src/pages/imageTool/ImageTypeConverter.jsx',
            './src/pages/imageTool/BgRemover.jsx',
            './src/pages/imageTool/QrGenerator.jsx'
          ]
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'] // Remove specific console methods
      },
      mangle: {
        safari10: true
      }
    },
    // Source maps (disable in production for better performance)
    sourcemap: false,
    // Asset inlining threshold
    assetsInlineLimit: 4096 // 4kb
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ]
  },
  // Preview server config
  preview: {
    port: 3000,
    strictPort: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },
  // Dev server config
  server: {
    port: 5173,
    strictPort: false,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }
  }
})
