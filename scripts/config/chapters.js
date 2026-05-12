// Chapter configuration - shared metadata for navigation, themes and scenes.

export const chapters = [
    {
        id: 'chapter-1',
        number: 1,
        navLabel: 'Interacción',
        title: 'El nacimiento de la interacción',
        theme: 'chapter-1',
        sceneId: 'scene-1',
        scene: 'scene--chapter-1',
        keywords: ['respuesta', 'input', 'arcade'],
        takeaway: 'Before worlds existed, there was response.'
    },
    {
        id: 'chapter-2',
        number: 2,
        navLabel: 'Exploración',
        title: 'Cuando la pantalla empezó a avanzar',
        theme: 'chapter-2',
        sceneId: 'scene-2',
        scene: 'scene--chapter-2',
        keywords: ['exploración', 'niveles', 'progreso'],
        takeaway: 'The screen stopped being a room. It became a path.'
    },
    {
        id: 'chapter-3',
        number: 3,
        navLabel: 'Espacio',
        title: 'El salto al espacio',
        theme: 'chapter-3',
        sceneId: 'scene-3',
        scene: 'scene--chapter-3',
        keywords: ['3D', 'profundidad', 'cámara'],
        takeaway: 'Players no longer crossed a screen. They entered a space.'
    },
    {
        id: 'chapter-4',
        number: 4,
        navLabel: 'Conexión',
        title: 'Jugar dejó de ser solitario',
        theme: 'chapter-4',
        sceneId: 'scene-4',
        scene: 'scene--chapter-4',
        keywords: ['online', 'conexión', 'multijugador'],
        takeaway: 'The game world expanded beyond the screen in front of one person.'
    },
    {
        id: 'chapter-5',
        number: 5,
        navLabel: 'Creación',
        title: 'El jugador también construye',
        theme: 'chapter-5',
        sceneId: 'scene-5',
        scene: 'scene--chapter-5',
        keywords: ['creación', 'modding', 'editor'],
        takeaway: 'The player became more than a participant. They became a maker.'
    },
    {
        id: 'chapter-6',
        number: 6,
        navLabel: 'Reacción',
        title: 'Mundos que responden',
        theme: 'chapter-6',
        sceneId: 'scene-6',
        scene: 'scene--chapter-6',
        keywords: ['sistemas', 'IA', 'emergencia'],
        takeaway: 'The world does not only wait for the player. It reacts.'
    }
];

export const defaultChapterId = chapters[0].id;

export function getChapterById(chapterId) {
    return chapters.find((chapter) => chapter.id === chapterId) || null;
}

export function getChapterByScene(sceneClass) {
    return chapters.find((chapter) => chapter.scene === sceneClass) || null;
}

export const playerProfiles = [
    {
        id: 'explorador',
        label: 'Explorador',
        description: 'Te gusta descubrir cada rincón del mundo virtual, encontrar secretos y entender cómo funciona todo.'
    },
    {
        id: 'competitivo',
        label: 'Competitivo',
        description: 'Tu objetivo es mejorar, superar récords y demostrar tu habilidad en cada partida.'
    },
    {
        id: 'creativo',
        label: 'Creativo',
        description: 'Construyes, diseñas y expresas tu personalidad a través de las herramientas que el juego te da.'
    },
    {
        id: 'narrativo',
        label: 'Narrativo',
        description: 'Buscas la historia, los personajes y las emociones que solo los mundos virtuales pueden ofrecer.'
    }
];
