<?php

class MedicoController {
    private mysqli $conn;

    public function __construct() {
        $config = require __DIR__ . '/config.php';
        $this->conn = new mysqli(
            $config['host'],
            $config['username'],
            $config['password'],
            $config['dbname'],
            $config['port']
        );

        if ($this->conn->connect_error) {
            throw new RuntimeException('Erro de conexão com o banco de dados');
        }
    }

    public function getAllMedicos() {
        $sql = "SELECT id, nome, CRM, UFCRM FROM medicos";
        $result = $this->conn->query($sql);

        if ($result === false) {
            throw new RuntimeException('Erro ao buscar medicos');
        }

        $medicos = [];
        while ($row = $result->fetch_assoc()) {
            $medicos[] = [
                'id' => (int) $row['id'],
                'nome' => $row['nome'],
                'CRM' => $row['CRM'],
                'UFCRM' => $row['UFCRM'],
            ];
        }

        echo json_encode($medicos);
    }

    public function createMedico() {
        $data = $this->parseRequestBody();
        if ($data === null) {
            return;
        }

        $fields = $this->validateMedicoPayload($data);
        if ($fields === null) {
            return;
        }

        ['nome' => $nome, 'CRM' => $crm, 'UFCRM' => $ufcrm] = $fields;

        $sql = "INSERT INTO medicos (nome, CRM, UFCRM) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            throw new RuntimeException('Erro ao preparar comando de insercao');
        }

        $stmt->bind_param('sss', $nome, $crm, $ufcrm);
        $saved = $stmt->execute();
        $stmt->close();

        if (!$saved) {
            throw new RuntimeException('Erro ao criar medico');
        }

        http_response_code(201);
        echo json_encode(['message' => 'Médico criado com sucesso']);
    }

    public function getMedicoById(int $id) {
        $sql = "SELECT id, nome, CRM, UFCRM FROM medicos WHERE id = ?";
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            throw new RuntimeException('Erro ao preparar busca de medico');
        }

        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $medico = $result->fetch_assoc();
        $stmt->close();

        if (!$medico) {
            http_response_code(404);
            echo json_encode(['message' => 'Médico não encontrado']);
            return;
        }

        echo json_encode([
            'id' => (int) $medico['id'],
            'nome' => $medico['nome'],
            'CRM' => $medico['CRM'],
            'UFCRM' => $medico['UFCRM'],
        ]);
    }

    public function updateMedico(int $id) {
        $data = $this->parseRequestBody();
        if ($data === null) {
            return;
        }

        $fields = $this->validateMedicoPayload($data);
        if ($fields === null) {
            return;
        }

        ['nome' => $nome, 'CRM' => $crm, 'UFCRM' => $ufcrm] = $fields;

        $sql = "UPDATE medicos SET nome = ?, CRM = ?, UFCRM = ? WHERE id = ?";
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            throw new RuntimeException('Erro ao preparar atualizacao de medico');
        }

        $stmt->bind_param('sssi', $nome, $crm, $ufcrm, $id);
        $stmt->execute();

        $updatedRows = $stmt->affected_rows;
        $stmt->close();

        if ($updatedRows === 0) {
            if (!$this->medicoExists($id)) {
                http_response_code(404);
                echo json_encode(['message' => 'Médico não encontrado']);
                return;
            }
        }

        echo json_encode(['message' => 'Médico atualizado com sucesso']);
    }

    public function deleteMedico(int $id) {
        $sql = "DELETE FROM medicos WHERE id = ?";
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            throw new RuntimeException('Erro ao preparar exclusao de medico');
        }

        $stmt->bind_param('i', $id);
        $stmt->execute();
        $deletedRows = $stmt->affected_rows;
        $stmt->close();

        if ($deletedRows === 0) {
            http_response_code(404);
            echo json_encode(['message' => 'Médico não encontrado']);
            return;
        }

        echo json_encode(['message' => 'Médico removido com sucesso']);
    }

    private function parseRequestBody(): ?array {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!is_array($data)) {
            http_response_code(400);
            echo json_encode(['message' => 'Body JSON invalido']);
            return null;
        }

        return $data;
    }

    private function validateMedicoPayload(array $data): ?array {
        $nome = trim($data['nome'] ?? '');
        $crm = trim($data['CRM'] ?? '');
        $ufcrm = trim($data['UFCRM'] ?? '');

        if ($nome === '' || $crm === '' || $ufcrm === '') {
            http_response_code(422);
            echo json_encode(['message' => 'nome, CRM e UFCRM sao obrigatorios']);
            return null;
        }

        return [
            'nome' => $nome,
            'CRM' => $crm,
            'UFCRM' => $ufcrm,
        ];
    }

    private function medicoExists(int $id): bool {
        $sql = "SELECT 1 FROM medicos WHERE id = ? LIMIT 1";
        $stmt = $this->conn->prepare($sql);

        if ($stmt === false) {
            throw new RuntimeException('Erro ao validar medico existente');
        }

        $stmt->bind_param('i', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $exists = $result->num_rows > 0;
        $stmt->close();

        return $exists;
    }
}