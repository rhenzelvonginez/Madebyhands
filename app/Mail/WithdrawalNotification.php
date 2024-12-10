<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WithdrawalNotification extends Mailable
{
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   */

  public $status;
  public $amount;

  public function __construct($status, $amount)
  {
    $this->amount = $amount;
    $this->status = $status;
  }

  /**
   * Get the message envelope.
   */
  public function envelope(): Envelope
  {
    return new Envelope(
      subject: $this->status == 'rejected' ? 'Withdrawal Request Rejected' : 'Withdrawal Request Successful',
    );
  }

  /**
   * Get the message content definition.
   */
  public function content(): Content
  {
    return new Content(
      view: 'Mail.Withdrawal',
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
