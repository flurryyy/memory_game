<?php

namespace Game\Services\Twig;

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class TwigService {

    public $twig;

    /**
     * TwigService constructor.
     */
    public function __construct() {
        // On dit à Twig où se situe nos templates
        $loader = new FilesystemLoader(__DIR__.'/../../Views');
        // Stocke la configuration de Twig et va nous permettre de rendre les templates
        // Nous pourrons l'appeler en instanciant notre TwigService => (new TwigService())->twig;
        $this->twig = new Environment($loader);
    }
}