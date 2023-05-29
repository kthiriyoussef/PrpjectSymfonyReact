<?php

namespace App\Controller;

use App\Entity\Question;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

class QuestionController extends AbstractController
{
    #[Route('/api/question', name: 'app_question',methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $questions = $doctrine
        ->getRepository(Question::class)
        ->findAll();
        $data = [];
  
        foreach ($questions as $question) {
           $data[] = [
               'id' => $question->getid(),
               'question' => $question->getQuestion(),
               'creationDate' => $question->getCreateDate(),
           ];
    }
    return $this->json($data);
}
#[Route('/api/newquestion', name: 'app_newquestion',methods: ['POST'])]
public function newQuestion(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
  
        $question = new Question();
        $quest= $request->request->get('question');
        $question->setQuestion($quest);
        $creationDate = $request->request->get('creationDate');
        $date = DateTime::createFromFormat('Y-m-d', $creationDate);
        $question->setCreateDate($date);
  
        $entityManager->persist($question);
        $entityManager->flush();
  
        return $this->json('Created new project successfully with id ' . $question->getId());
    }
}