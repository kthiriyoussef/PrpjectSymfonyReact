<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;

use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
class ApiLoginController extends AbstractController
{

    

    #[Route('/api/login', name: 'api_login')]
    public function login(Request $request,ManagerRegistry $doctrine): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $entityManager = $doctrine->getManager();
        // Retrieve the user from the user provider
        $user =$entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        // Check if the user exists
        if (!$user) {
            throw new BadCredentialsException('Invalid username or password');
        }

        // Check if the password is correct
        if ($user->getPassword() !== $password) {
            throw new BadCredentialsException('Invalid username or password');
        }

        // Authentication successful
        return new JsonResponse(['message' => 'Login successful']);
    }
}








