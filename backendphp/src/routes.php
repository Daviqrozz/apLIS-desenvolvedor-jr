<?php

require_once __DIR__ . '/MedicoController.php';

function dispatchRequest(): void
{
    $controller = new MedicoController();

    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';
    $requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $matches = [];

    if ($path === '/api/v1/medicos') {
        if ($requestMethod === 'GET') {
            $controller->getAllMedicos();
            return;
        }

        if ($requestMethod === 'POST') {
            $controller->createMedico();
            return;
        }

        http_response_code(405);
        echo json_encode(['message' => 'Metodo nao permitido']);
        return;
    }

    if (preg_match('#^/api/v1/medicos/(\d+)$#', $path, $matches) !== 1) {
        http_response_code(404);
        echo json_encode(['message' => 'Rota não encontrada']);
        return;
    }

    $id = (int) $matches[1];

    if ($requestMethod === 'GET') {
        $controller->getMedicoById($id);
        return;
    }

    if ($requestMethod === 'PUT') {
        $controller->updateMedico($id);
        return;
    }

    if ($requestMethod === 'DELETE') {
        $controller->deleteMedico($id);
        return;
    }

    http_response_code(405);
    echo json_encode(['message' => 'Metodo nao permitido']);
}