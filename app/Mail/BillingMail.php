<?php

namespace App\Mail;

use Carbon\Carbon;
use Date;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BillingMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $items;
    public $payment;
    public $date;
    public $orderId;

    public $customer;
    public function __construct($line_items, $payment_method, $orderId)
    {
        // dd( $this->items = $line_items,
        // $this->payment = $payment_method,
        // $this->date = Carbon::now(),
        // $this->orderId = $orderId,
        // $this->customer = Auth()->user()->first_name . " " . Auth()->user()->last_name);

        $this->items = $line_items;
        $this->payment = $payment_method;
        $this->date = Carbon::now();
        $this->orderId = $orderId;
        $this->customer = Auth()->user()->first_name . " " . Auth()->user()->last_name;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Billing Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'Mail.BillingMail',
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
