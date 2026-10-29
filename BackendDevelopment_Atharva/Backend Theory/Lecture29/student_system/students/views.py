
from django.http import JsonResponse



def health_check(request):
    return JsonResponse(
        {"status": "ok"},
        status=200
    )



def student_detail(request, student_id):
    return JsonResponse({
        "student_id": student_id
    })
