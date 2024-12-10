<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SellerVerified extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   */

  public $sellerData;
  public function __construct($sellerData)
  {
    $this->sellerData = (object) $sellerData;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      // from: new Address('madebyhands@email.com', 'MadeByHands'),
      subject: 'Your account in MadeByHands is Verified',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'Mail.account.VerifiedSeller',
    );
  }

  /**
   * Get the attachments for the message.
   *
   * @return array<int, \Illuminate\Mail\Mailables\Attachment>
   */
  public function attachments(): array
  {
    return [];
  }
}
