<?php

namespace App\Notifications;

use App\Models\School;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewSchool extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Crée une nouvelle instance de notification.
     */
    public function __construct(private readonly School $school)
    {
        //
    }

    /**
     * Retourne les canaux de diffusion de la notification.
     *
     * @param  object  $notifiable
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Représentation de la notification par email.
     *
     * @param  object  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouvelle école enregistrée')
            ->greeting('Bonjour ' . ($notifiable->name ?? ''))
            ->line("Nous vous confirmons que l’école **{$this->school->name}** a été enregistrée avec succès sur notre plateforme.")
            ->line('Vous pouvez maintenant accéder à votre tableau de bord pour configurer les niveaux, les années académiques et inviter d’autres membres.')
            ->action('Accéder à mon tableau de bord', url('/dashboard'))
            ->line('Merci d’avoir rejoint notre plateforme et à très bientôt !');
    }

    /**
     * Représentation de la notification pour la base de données.
     *
     * @param  object  $notifiable
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_school',
            'message' => "L’école « {$this->school->name} » a été enregistrée avec succès.",
            'url' => '/dashboard',
        ];
    }
}
