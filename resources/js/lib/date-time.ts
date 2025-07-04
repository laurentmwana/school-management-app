export const ago = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "À l'instant"
  
  if (diffInHours < 24) return `il y a ${diffInHours}h`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `il y a ${diffInDays}j`

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) return `il y a ${diffInWeeks}sem`

  const diffInMonths = Math.floor(diffInDays / 30)
  return `il y a ${diffInMonths}mois`
}

export const getFrenchDay = (dateStr: string): string => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    if (!isValidDate) {
        throw new Error("Le format de la date doit être 'Y-m-d'.");
    }

    const date = new Date(dateStr);

    const daysInFrench = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

    const dayIndex = date.getDay();

    return daysInFrench[dayIndex];
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

