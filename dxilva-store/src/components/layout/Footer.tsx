import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dxilva-black text-dxilva-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-cinzel text-2xl font-bold text-dxilva-yellow">
              D'XILVA
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu destino premium para productos exclusivos. Calidad, innovación y estilo en un solo lugar.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dxilva-yellow transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dxilva-yellow transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-dxilva-yellow transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/catalogo" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Servicio al Cliente</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/ayuda" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/envios" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Información de Envíos
                </Link>
              </li>
              <li>
                <Link href="/devoluciones" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-400 hover:text-dxilva-yellow transition-colors text-sm">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-cinzel text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-dxilva-yellow flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  La Habana, Cuba
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-dxilva-yellow flex-shrink-0" />
                <span className="text-gray-400 text-sm">+53 5XXX XXXX</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-dxilva-yellow flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@dxilvastore.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} D'XILVA Store. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-gray-500 text-sm">Métodos de Pago:</span>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">QvaPay</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Transfermóvil</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Enzona</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
