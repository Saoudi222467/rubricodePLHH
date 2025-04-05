"use client"

import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { Heart, Mail, MapPin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-warm-gold/10 bg-mint-white py-12">
      <Container>
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo-main.png" alt="PLHH Coin" width={40} height={40} className="h-8 w-8" />
              <span className="font-montserrat font-bold text-dark-text">PLHH Coin</span>
            </div>
            <p className="text-sm text-dark-text/80">GOTT WALD HOLDING</p>
            <p className="text-xs text-dark-text/80">Identification Number: 400415421</p>
          </div>

          {/* Contact info */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium text-dark-text">Contact Us</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link
                href="https://www.plhh.world"
                className="flex items-center gap-2 text-dark-text hover:text-forest-green transition-colors"
              >
                <span>www.plhh.world</span>
              </Link>
              <Link
                href="mailto:office@plhh.world"
                className="flex items-center gap-2 text-dark-text hover:text-forest-green transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>office@plhh.world</span>
              </Link>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-medium text-dark-text">Legal Address</h3>
            <div className="flex items-start gap-2 text-sm text-dark-text/80">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>Georgia, Tbilisi, Gldani district, Marseli Street, N2a, Entrance N2, N201, reference 35.64, Block G</p>
            </div>
            
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 border-t border-warm-gold/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-dark-text/80">
              &copy; {new Date().getFullYear()} GOTT WALD HOLDING. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-dark-text">
              Made with <Heart className="h-4 w-4 text-peach-coral" /> for Humanity
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

